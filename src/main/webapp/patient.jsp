<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="model.Diagnosis" %>
<%@ page import="service.EntityService" %>
<%@ page import="service.impl.DiagnosisServiceImpl" %>
<%@ page import="java.util.HashSet" %>
<%@ page import="model.Patient" %>
<%@ page import="service.impl.PatientServiceImpl" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>Diagnosis</title>
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="http://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
</head>
<body>
<table id="patient" border="1">
    <thead>
    <tr>
        <th>First name</th>
        <th>Last name</th>
        <th>Date of birth</th>
        <th>Action</th>
    </tr>
    </thead>
    <tbody id="patientContainer">
    <%
        EntityService<Patient> patientService = new PatientServiceImpl();
        HashSet<Patient> patientSet = patientService.findAll();
    %>
    <% for (Patient c : patientSet) { %>
    <tr class="row">
        <input class="patientId" type="hidden" value="<%=c.getPatientId()%>">
        <td><input class="patientFirstName" readonly="readonly" type="text" value="<%=c.getPatientFirstName()%>"></td>
        <td><input class="patientLastName" readonly="readonly" type="text" value="<%=c.getPatientLastName()%>"></td>
        <td><input id="datePicker" readonly="readonly" type="text" value="<%=c.getPatientDateOfBirth()%>"></td>
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
    <li><a href="examination.jsp">Examination</a> </li>
    <li><a href="specialization.jsp">Specialization</a> </li>
    <li><a href="staff.jsp">Staff</a> </li>
</div>
<script type="text/javascript" src="js/patientScript.js"></script>
</body>
</html>