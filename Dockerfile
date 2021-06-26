FROM nginx
COPY dist /usr/share/nginx/html
COPY nginx/ /etc/nginx/conf.d/
COPY nginx/replace_env.sh /docker-entrypoint.d/replace_env.sh

RUN chmod a+x /docker-entrypoint.d/replace_env.sh