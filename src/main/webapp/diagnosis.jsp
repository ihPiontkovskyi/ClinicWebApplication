<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="model.Diagnosis" %>
<%@ page import="service.EntityService" %>
<%@ page import="service.impl.DiagnosisServiceImpl" %>
<%@ page import="java.util.HashSet" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>Diagnosis</title>
    <link rel="stylesheet" href="css/style.css">
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
</head>
<body>
<h2>Diagnosis table</h2>
<div class="tableContent">
<table id="diagnosis" border="1">
    <thead>
    <tr>
        <th>Class</th>
        <th>Name</th>
        <th>Action</th>
    </tr>
    </thead>
    <tbody id="diagnosisContainer">
    <%
        EntityService<Diagnosis> diagnosisService = new DiagnosisServiceImpl();
        HashSet<Diagnosis> set = diagnosisService.findAll();
    %>
    <% for (Diagnosis c : set) { %>
    <tr class="row">
        <input class="diagnosisId" type="hidden" value="<%=c.getDiagnosisId()%>">
        <td><input class="diagnosisClass" readonly="readonly" type="text" value="<%=c.getDiagnosisClass()%>"></td>
        <td><input class="diagnosisName" readonly="readonly" type="text" value="<%=c.getDiagnosisName()%>"></td>
        <td id="action">
            <input class="edit" type="button" >
            <input class="save" type="hidden" >
            <input class="delete" type="button" >
        </td>
    </tr>
    <% } %>
    <input id="add" type="button" >
    </tbody>
</table>
</div>
<div class="hrefs">
    <ul>
        <li><a href="examination.jsp">Examination</a></li>
        <li><a href="patient.jsp">Patient</a></li>
        <li><a href="specialization.jsp">Specialization</a></li>
        <li><a href="staff.jsp">Staff</a></li>
    </ul>
</div>
<script type="text/javascript" src="js/diagnosisScript.js"></script>
</body>
</html>