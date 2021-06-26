#! /bin/bash -e 
if [ "$REPLACE_ENV" = "REPLACE" ]; \
then echo REPLACE_ENV:REPLACE \
&& sed -i 's@base href="/"@base href="/'"$BASE_VIRTUAL_PATH"'/"@g' /usr/share/nginx/html/index.html \
&& find /usr/share/nginx/html -type f -name "*.js" | xargs sed -i 's@http://api.moongate.sfdapp.com@'"$API_ENV"'@g';\
else \
echo REPLACE_ENV:"${REPLACE_ENV}"; \
fi;