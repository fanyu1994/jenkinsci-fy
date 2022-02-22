pipeline {
  agent any
  environment {
      NAME = 'getfood-jenkins'
      APP = 'fanyu/getfood-jenkins:dev'
      $credentialsId = 'getfood-sk'
  }

  stages {
      stage('下载代码') {
          steps {
        echo '****************************** download code start... ******************************'
        git branch: '$branch', credentialsId: '$credentialsId', url: '$gitUrl'
          }
      }

      stage('vue编译') {
          steps {
        echo '****************************** vue start... ******************************'
        sh 'cnpm install'
        sh 'cnpm run build'
          }
      }

      stage('构建Docker镜像') {
          steps {
        echo '****************************** delete container and image... ******************************'
        sh 'docker ps -a|grep $NAME|awk \'{print $1}\'|xargs -i docker stop {}|xargs -i docker rm {}'
        sh 'docker images|grep $NAME|grep dev|awk \'{print $3}\'|xargs -i docker rmi {}'

        echo '****************************** build image... ******************************'
        sh 'docker build --build-arg PROFILE=$nginxConfProfile -t $APP .'
          }
      }

      stage('运行容器') {
          steps {
        echo '****************************** run start... ******************************'
        sh 'docker run -d -p $appPort:80 --restart=always --name $NAME $APP'
          }
      }
  }
}
