<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="model.Patient" %>
<%@ page import="service.EntityService" %>
<%@ page import="service.impl.PatientServiceImpl" %>
<%@ page import="java.util.HashSet" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>Patient</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css"/>
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="http://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
</head>
<body>
<h2>Patients table:</h2>
<div class="tableContent">
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
        <td><input class="datePicker" disabled="disabled" type="text" value="<%=c.getPatientDateOfBirth()%>"></td>
        <td id="action">
            <input class="edit" type="button">
            <input class="save" type="hidden">
            <input class="delete" type="button">
        </td>
    </tr>
    <% } %>
    <input id="add" type="button" >
    </tbody>
</table>
</div>
<div class="hrefs">
    <ul>
        <li><a href="diagnosis.jsp">Diagnosis</a></li>
        <li><a href="examination.jsp">Examination</a></li>
        <li><a href="specialization.jsp">Specialization</a></li>
        <li><a href="staff.jsp">Staff</a></li>
    </ul>
</div>
<script type="text/javascript" src="js/patientScript.js"></script>
</body>
</html>