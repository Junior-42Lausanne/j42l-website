#!/bin/bash

usage() {
    echo "Usage: $0 [strapi|next|--help] [--tag TAG]"
    echo "  strapi      Build and push Strapi Docker image"
    echo "  next        Build and push Next.js Docker image"
    echo "  (no arg)    Build and push both Strapi and Next.js Docker images"
    echo "  --help      Show this help message"
    echo "  --tag TAG   Specify a custom tag for the Docker images (default: latest)"
    exit 1
}

if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed or not in PATH."
    exit 1
fi

# Default tag
TAG="latest"

# Parse arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --help)
            usage
            ;;
        --tag)
            if [ -z "$2" ] || [[ "$2" == -* ]]; then
                echo "Error: --tag requires a value."
                usage
            fi
            TAG="$2"
            shift
            ;;
        *)
            OPTION="$1"
            ;;
    esac
    shift
done

build_and_push() {
    local app_name=$1
    local dockerfile_path=$2
    local image_name=$3
    echo "Building and pushing $app_name with tag '$TAG'..."
    if docker build -t "$image_name" "$dockerfile_path" --no-cache && docker push "$image_name"; then
        echo "$app_name successfully built and pushed."
    else
        echo "Error: Failed to build or push $app_name."
        exit 1
    fi
}

if [ -z "$OPTION" ]; then
    echo "Building and pushing both Strapi and Next.js with tag '$TAG'..."
    build_and_push "Next.js" "./next/" "theorangecake/nextjs-app:$TAG"
    build_and_push "Strapi" "./strapi/" "theorangecake/strapi-app:$TAG"
elif [ "$OPTION" = 'strapi' ]; then
    build_and_push "Strapi" "./strapi/" "theorangecake/strapi-app:$TAG"
elif [ "$OPTION" = 'next' ]; then
    build_and_push "Next.js" "./next/" "theorangecake/nextjs-app:$TAG"
else
    echo "Error: Invalid option '$OPTION'."
    usage
fi
