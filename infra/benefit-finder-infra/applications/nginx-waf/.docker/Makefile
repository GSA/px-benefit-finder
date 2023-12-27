nginx-waf-with-modsecurity: Dockerfile
	docker build --tag nginx-modsecurity .
	docker create --name nginx-vol nginx-modsecurity
	docker cp nginx-vol:/ngx_http_modsecurity_module.so ../modules
	docker rm -f nginx-vol
	docker rmi -f nginx-modsecurity
