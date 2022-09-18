server_name="easypass"
port="5000"

# -----------------------------------------------

docker_compose_up() {
    echo "run docker compose up"
    docker-compose up -d
}

# -----------------------------------------------

# Menu Options
option_1="Run docker composer up "

PS3='Please enter your choice or q to Quit:'

# ----------------------------------------------------------------

options=("${option_1}")

# ----------------------------------------------------------------

select opt in "${options[@]}"
do
    case $opt in
        "${option_1}")
            docker_compose_up
            ;;
        *) echo "Bye bye sweetie :) "; break;;
    esac
done
