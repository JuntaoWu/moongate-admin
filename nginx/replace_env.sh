#! /bin/bash -e
if [ "$REPLACE_ENV" = "REPLACE" ]; \
then echo REPLACE_ENV:REPLACE \
&& sed -i 's@base href="/"@base href="'"$BASE_VIRTUAL_PATH"'@g' /usr/share/nginx/html/index.html \
&& sed -i 's@BRAND_NAME@'"$BRAND_NAME"'@g' /usr/share/nginx/html/index.html \
&& find /usr/share/nginx/html -type f -name "*.js" | xargs sed -i 's@API_ENV@'"$API_ENV"'@g' \
&& find /usr/share/nginx/html -type f -name "*.js" | xargs sed -i 's@BRAND_NAME@'"$BRAND_NAME"'@g'; \
else \
echo REPLACE_ENV:"${REPLACE_ENV}"; \
fi;
