# ScaffoldCVAW

C = Controller (Asp .Net Controller)

V = View (SPA Razor View with AngularJs)

A = Angular Controller

W = Web Api (Service Layer)

### How to Install:

Execute the following command in Package Manager Console:

`Install-Package ScaffoldCVAW`

After you have installed the Nuget Package you can Scaffold CRUD operation for any model in your project using:

`Scaffold CVAW <modelName> -dbContext <dbContextName>`

It will generate the following files:

- An Asp .Net Controller in your project's `Controllers` Folder. The controller will have only one method that will render the View `Index`.
-  A Razor View in the corresponding `Views/<Controller>/` location.
-  An Angular Controller which will be used to communicate with the Service Layer and make the View Responsive.
-  A Web Api (Service Layer) which is responsible for processing the Ajax calls sent by the UI and returning data in response to that call.

You can get the idea of how things work after scaffolding from the picture below:

![alt tag](http://oi61.tinypic.com/10mrktd.jpg)
