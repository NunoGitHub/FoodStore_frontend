## HTTP Interceptors in Angular

In Angular, HTTP interceptors are a powerful feature that allows you to intercept and modify HTTP requests and responses at a centralized location. They act as middleware, sitting between the application’s HTTP client (typically the built-in HttpClient module) and the server.

## What is an HTTP Interceptor?

HTTP Interceptors are a middleware mechanism in Angular’s HttpClient module that intercepts HTTP requests and responses. They allow you to intercept outgoing HTTP requests or incoming HTTP responses and perform operations such as modifying request headers, handling errors, adding authentication tokens, caching responses, and more.


## Features of HTTP Interceptor
* Request Modification: Interceptors can modify outgoing HTTP requests before they are sent to the server. This includes adding headers, transforming request bodies, or even cancelling requests altogether.
* Response Modification: Interceptors can also modify incoming HTTP responses before they reach the application code. This can involve transforming response data, handling errors, or adding custom logic based on the response.
* Global Applicability: Interceptors are registered at the module level and are automatically applied to all HTTP requests and responses within the application, ensuring consistent behavior across different components and services.
* Chaining: Multiple interceptors can be registered and chained together, allowing for modular and reusable code.
* Dependency Injection: Interceptors can be injected with other services or dependencies, enabling more complex logic and integration with other parts of the application.


## How HTTP Interceptors Work in Angular

1. Intercepting Requests:

    * When you make an HTTP request (such as GET, POST, PUT, etc.), Angular passes this request through a chain of configured interceptors.
    * The interceptor can modify the request before it is actually sent to the server. For example, it can add authentication headers, log the request, or alter the request body.

2. Modifying the Request:

    * The interceptor can modify the request, such as adding an authentication token, changing headers, or even altering the request body.

3. Sending the Request:

    * After any modifications (if any), the interceptor must pass the request to the next interceptor in the chain (or to the server if it's the last interceptor) using the next.handle(req) method.

4. Intercepting Responses:

    * Similarly to requests, responses also pass through a chain of interceptors. The interceptor can modify the response before it is processed by the application.
    * For example, it can handle response errors, format the response, or manipulate the data received.

5. Finalization:

    * Finally, the modified response is returned to the part of the application that made the request.


### guards check some condition for showing some components

preciso de ver o 15 e depois o 17.3
