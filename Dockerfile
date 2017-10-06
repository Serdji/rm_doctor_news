FROM registry.art.rambler.ru/common/ruby:2.3.3-build
LABEL org.label-schema.maintainer="Igor Simdyanov"
LABEL org.label-schema.maintainer.email="i.simdyanov@rambler-co.ru"
LABEL org.label-schema.vcs-url="https://gitlab.rambler.ru/CLOUD/docker-library/tree/master/common/ruby/2.3"
LABEL org.label-schema.docker.cmd="docker container run --rm -it registry.art.rambler.ru/common/ruby:2.3.3-build bash"
LABEL org.label-schema.versions.centos="7.3.1611"
LABEL org.label-schema.versions.ruby="2.3.3"
LABEL org.label-schema.version.nodejs="6.x"
LABEL "vendor"="Rambler&Co"
LABEL "version"="1.0"
ENV RAILS_ENV=production
ENV CURRENT /var/www/doctor.rambler.ru/current
WORKDIR $CURRENT
ADD Gemfile $CURRENT
ADD Gemfile.lock $CURRENT
RUN bundle install --path vendor/ruby --without test
ADD . $CURRENT
RUN bundle exec rake tmp:create && mkdir -p /var/www/doctor.rambler.ru/shared/tmp && mkdir -p /var/www/doctor.rambler.ru/shared/tmp/pids && mkdir -p /var/www/doctor.rambler.ru/shared/tmp/sockets && mkdir -p /var/www/doctor.rambler.ru/shared/tmp/cache && mkdir -p /var/www/doctor.rambler.ru/shared/log
EXPOSE 8088
CMD bundle exec rake db:migrate && bundle exec eye load config/eye.rb && bundle exec eye restart doctor.rambler.ru:unicorn