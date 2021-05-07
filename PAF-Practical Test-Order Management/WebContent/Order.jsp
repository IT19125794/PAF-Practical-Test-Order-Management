<%@ page import="com.OrderService" %>
<%@ page import="model.Order" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title> Order Management </title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/Order.js"></script>
</head>

<body>

	<div class="container">
		<div class="row">
			<div class="col-6">
		
			<h1> Order Management </h1>
		
			<form id="formOrder" name="formOrderm">
 				Order date:
 				<input id="order_date" name="order_date" type="date" class="form-control form-control-sm">
 				<br> 
 				Project ID:
 				<input id="project_id" name="project_id" type="text" class="form-control form-control-sm">
 				<br> 
 				Project name:
 				<input id="project_name" name="project_name" type="text" class="form-control form-control-sm">
 				<br> 
 				Sponsor ID:
 				<input id="sponsor_id" name="sponsor_id" type="text" class="form-control form-control-sm">
 				<br> 
 				Budget:
 				<input id="budget" name="budget" type="text" class="form-control form-control-sm">
 				<br> 
 		
 				<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">
 				<input type="hidden" id="hidOrderIDSave" name="hidOrderIDSave" value="">
 		
			</form>
	
			<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				<br>
					<div id="divOrdersGrid">
 						<%
 							Order orderObj = new Order();
 							out.print(orderObj.readOrders());
 						%>
					</div>
			</div> 
		</div> 
	</div>

</body>
</html>