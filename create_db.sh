echo Using Password: $1
docker start pg
docker run --name pg -e POSTGRES_PASSWORD=$1 -p 32768:5432 -d  postgres
sleep 5
docker run -it --rm -e PGPASSWORD=$1 --link pg:postgres postgres createdb -h postgres -U postgres generic_db --no-password
