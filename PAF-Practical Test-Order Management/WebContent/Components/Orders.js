$.ajax(
{
 url : "OrderAPI",
 type : type,
 data : $("#formOrder").serialize(),
 dataType : "text",
 complete : function(response, status)
 {
 onOrderSaveComplete(response.responseText, status);
 }
});

$(document).ready(function()
{
if ($("#alertSuccess").text().trim() == "")
 {
 $("#alertSuccess").hide();
 }
 $("#alertError").hide();
});
// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
// Clear alerts---------------------
 $("#alertSuccess").text("");
 $("#alertSuccess").hide();
 $("#alertError").text("");
 $("#alertError").hide();
// Form validation-------------------
var status = validateItemForm();
if (status != true)
 {
 $("#alertError").text(status);
 $("#alertError").show();
 return;
 }
// If valid------------------------
var type = ($("#hidOrderIDSave").val() == "") ? "POST" : "PUT";
 $.ajax(
 {
 url : "OrderAPI",
 type : type,
 data : $("#formOrder").serialize(),
 dataType : "text",
 complete : function(response, status)
 {
 onOrderSaveComplete(response.responseText, status);
 }
 });
});
// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
$("#hidOrderIDSave").val($(this).data("orderID"));
 $("#order_date").val($(this).closest("tr").find('td:eq(0)').text());
 $("#project_id").val($(this).closest("tr").find('td:eq(1)').text());
 $("#project_name").val($(this).closest("tr").find('td:eq(2)').text());
 $("#sponsor_id").val($(this).closest("tr").find('td:eq(3)').text());
$("#budget").val($(this).closest("tr").find('td:eq(4)').text());
});
//DELETE===================================================
$(document).on("click", ".btnRemove", function(event)
{
 $.ajax(
 {
 url : "OrderAPI",
 type : "DELETE",
 data : "orderID=" + $(this).data("orderID"),
 dataType : "text",
 complete : function(response, status)
 {
 onOrderDeleteComplete(response.responseText, status);
 }
 });
});
// CLIENT-MODEL================================================================
function validateOrderForm()
{
// ORDER DATE
if ($("#order_date").val().trim() == "")
 {
 return "Insert Order Date.";
 }
// PROJECT ID
if ($("#project_id").val().trim() == "")
 {
 return "Insert Project ID.";
 }
// PROJECT NAME
if ($("#project_name").val().trim() == "")
 {
 return "Insert Project Name.";
 }
// SPONSOR ID
if ($("#sponsor_id").val().trim() == "")
 {
 return "Insert Sponsor ID.";
 }
// BUDGET-------------------------------
if ($("#budget").val().trim() == "")
 {
 return "Insert Budget.";
 }
// is numerical value
var tmpBudget = $("#budget").val().trim();
if (!$.isNumeric(tmpBudget))
 {
 return "Insert a numerical value for Budget.";
 }
// convert to decimal price
 $("#budget").val(parseFloat(tmpBudget).toFixed(2));

return true;
}
//============================================================
function onOrderSaveComplete(response, status)
{
if (status == "success")
 {
 var resultSet = JSON.parse(response);
 if (resultSet.status.trim() == "success")
 {
 $("#alertSuccess").text("Successfully saved.");
 $("#alertSuccess").show();
 $("#divOrdersGrid").html(resultSet.data);
 } else if (resultSet.status.trim() == "error")
 {
 $("#alertError").text(resultSet.data);
 $("#alertError").show();
 }
 } else if (status == "error")
 {
 $("#alertError").text("Error while saving.");
 $("#alertError").show();
 } else
 {
 $("#alertError").text("Unknown error while saving..");
 $("#alertError").show();
 } 
 $("#hidOrderIDSave").val("");
 $("#formOrder")[0].reset();
}
//==========================================================
function onOrderDeleteComplete(response, status)
{
if (status == "success")
 {
 var resultSet = JSON.parse(response);
 if (resultSet.status.trim() == "success")
 {
 $("#alertSuccess").text("Successfully deleted.");
 $("#alertSuccess").show();
 $("#divOrdersGrid").html(resultSet.data);
 } else if (resultSet.status.trim() == "error")
 {
 $("#alertError").text(resultSet.data);
 $("#alertError").show();
 }
 } else if (status == "error")
 {
 $("#alertError").text("Error while deleting.");
 $("#alertError").show();
 } else
 {
 $("#alertError").text("Unknown error while deleting..");
 $("#alertError").show();
 }
}