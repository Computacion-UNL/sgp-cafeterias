# Workspace setup
## Infrastructure
1. Install Docker: https://docs.docker.com/engine/install/debian/

2. Run:
        
        sudo groupadd docker
        sudo usermod -aG docker $USER
Replace $USER for your local username

3. Install Kubernetes with minikube package: https://minikube.sigs.k8s.io/docs/start/

4. Sign out and sign in again
5. The following command activate the changes to groups

        newgrp docker
6. Start the kubernetes cluster

         minikube start
7. Enable Ingress NGINX controller

        minikube addons enable ingress
To verify if ingress nginx controller is enabled run the following command:

        kubectl get pods -n ingress-nginx

## Development setup
1. Install Skaffold https://skaffold.dev/docs/install/

        curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64 && \
        sudo install skaffold /usr/local/bin/
2. Install kubectl, is a command line tool that allows you to run commands on kubernetes clusters, this tool is necesary to skaffold works. https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/


3. Environment variables are declared in the kubernetes cluster.

        kubectl create secret generic jwt-secret --from-literal=JWT_SECRET=secret
        kubectl create secret generic activation-token-max-age --from-literal=ACTIVATION_TOKEN_MAX_AGE=2
Is necessary create a cloudinary account (https://cloudinary.com/), then we go to copy the values required bellow.

        kubectl create secret generic cloud-name --from-literal=CLOUD_NAME=
        kubectl create secret generic api-key --from-literal=API_KEY=
        kubectl create secret generic api-secret --from-literal=API_SECRET=
4. Execute, in the system command line:

        minikube ip
Copy the result of the above command and add the following line in /etc/hosts file

        ip copied       cafeterias.ec
5. Finally, run this command on root folder:

        skaffold dev


# Documentation

install swagger

        npm install swagger-jsdoc swagger-ui-express

install development dependencies

        npm i -D @types/swagger-jsdoc @types/swagger-ui-express

Then, in the configuration file (usually app.ts) import the modules related to swagger.

        import swaggerUI from 'swagger-ui-express'
        import swaggerJsDoc from 'swagger-jsdoc'
        import {options} from './swaggerOptions'

For the swagger configuration, a file is created with the specifications of the options.

        export const options = {
        definition: {
        //Open API is a standard for API documentation.
        openapi: "3.0.0",
        info: {
        title: "Module API",
        version: "1.0.0",
        description: "Module management API",
        },
        servers: [
        {
        url: "http://localhost:3000",
        },
        ],
        },
        apis: ["./src/routes/*.ts"],
        };

In the configuration, the options that were defined will be sent to the swagger module.

        const specs = swaggerJsDoc(options)

**swaggerUI** module is used to have an express graphical interface to test http requests within the application itself.

For the configuration, in the lines following the configuration of the routes, the previous import will be used.

        app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs))

At this point, swagger is at version 7.0.0, but this is not stable, so if it gives an error, it is advisable to go back one version. In the terminal or command line, in the root directory, reinstall swagger jsdoc.

        npm i swagger-jsdoc@6.0.1
