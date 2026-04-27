#!/bin/sh
set -eu

REMOTE=":s3:${INFOMANIAK_S3_BUCKET}"
PREFIX="${DOKPLOY_VOL_BACKUP_PREFIX}"
WORKDIR="/tmp/restore"
BACKUP_TAR="${WORKDIR}/postgres-data.tar"
MARKER="/pgdata/.restored-from-s3"

mkdir -p "$WORKDIR"

if [ -f "$MARKER" ]; then
  echo "Postgres volume already restored. Skipping."
  exit 0
fi

if [ "$(find /pgdata -mindepth 1 -maxdepth 1 | wc -l)" -gt 0 ]; then
  echo "ERROR: /pgdata is not empty and no restore marker exists."
  echo "Refusing to overwrite an existing Postgres volume."
  exit 1
fi

mkdir -p "/pgdata"

echo "Finding latest Strapi PostgreSQL backup..."

LATEST_OBJECT="$(
  rclone lsf "$REMOTE" \
    --recursive \
    --files-only \
    --format "tp" \
    --s3-provider="Other" \
    --s3-access-key-id="${INFOMANIAK_ACCESS_KEY_ID}" \
    --s3-secret-access-key="${INFOMANIAK_SECRET_ACCESS_KEY}" \
    --s3-region="${INFOMANIAK_DEFAULT_REGION}" \
    --s3-endpoint="${INFOMANIAK_S3_ENDPOINT}" \
    --s3-no-check-bucket \
    --s3-force-path-style \
  | grep "$PREFIX" \
  | grep '\.tar$' \
  | sort \
  | tail -n 1 \
  | cut -d';' -f2-
)"

if [ -z "$LATEST_OBJECT" ]; then
  echo "ERROR: No backup found matching prefix: $PREFIX"
  exit 1
fi

echo "Latest backup:"
echo "$LATEST_OBJECT"
echo "SOURCE=[${REMOTE}/${LATEST_OBJECT}]"

echo "Downloading backup..."

rclone copyto "${REMOTE}/${LATEST_OBJECT}" "$BACKUP_TAR" \
  --s3-provider="Other" \
  --s3-access-key-id="${INFOMANIAK_ACCESS_KEY_ID}" \
  --s3-secret-access-key="${INFOMANIAK_SECRET_ACCESS_KEY}" \
  --s3-region="${INFOMANIAK_DEFAULT_REGION}" \
  --s3-endpoint="${INFOMANIAK_S3_ENDPOINT}" \
  --s3-no-check-bucket \
  --s3-force-path-style \
  --retries 3 \
  --low-level-retries 3 \
  --timeout 60s \
  --contimeout 10s

echo "Extracting backup..."

tar -tf "$BACKUP_TAR" | head -50

tar -xf "$BACKUP_TAR" -C /pgdata

echo "$LATEST_OBJECT" > "$MARKER"

echo "Restore complete."