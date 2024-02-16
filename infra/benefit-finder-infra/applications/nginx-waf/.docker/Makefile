nginx-waf-with-modsecurity: Dockerfile
	docker build --platform linux/amd64 --tag nginx-modsecurity .
	docker create --name nginx-vol nginx-modsecurity
	mkdir -p ../modules
	docker cp nginx-vol:/ngx_http_modsecurity_module.so ../modules
	docker rm -f nginx-vol
	docker rmi -f nginx-modsecurity
