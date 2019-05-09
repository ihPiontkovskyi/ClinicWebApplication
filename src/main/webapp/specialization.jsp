
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="model.Diagnosis" %>
<%@ page import="service.EntityService" %>
<%@ page import="service.impl.DiagnosisServiceImpl" %>
<%@ page import="java.util.HashSet" %>
<%@ page import="model.Specialization" %>
<%@ page import="service.impl.SpecializationServiceImpl" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>Specialization</title>
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
</head>
<body>
<h2>Specialization table</h2>
<table id="specialization" border="1">
    <thead>
    <tr>
        <th>Name</th>
        <th>Action</th>
    </tr>
    </thead>
    <tbody id="specializationContainer">
    <%
        EntityService<Specialization> specializationService = new SpecializationServiceImpl();
        HashSet<Specialization> set = specializationService.findAll();
    %>
    <% for (Specialization c : set) { %>
    <tr class="row">
        <input class="specializationId" type="hidden" value="<%=c.getSpecializationId()%>">
        <td><input class="specializationName" readonly="readonly" type="text" value="<%=c.getSpecializationName()%>"></td>
        <td id="action">
            <input class="edit" type="button" value="Edit">
            <input class="save" type="hidden" value="Save">
            <input class="delete" type="button" value="Delete">
        </td>
    </tr>
    <% } %>
    <input id="add" type="button" value="Add">
    </tbody>
</table>
<div>
    <li><a href="diagnosis.jsp">Diagnosis</a> </li>
    <li><a href="patient.jsp">Patient</a> </li>
    <li><a href="examination.jsp">Examination</a> </li>
    <li><a href="staff.jsp">Staff</a> </li>
</div>
<script type="text/javascript" src="js/specializationScript.js"></script>
</body>
</html>