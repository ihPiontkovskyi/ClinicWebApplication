
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="model.Diagnosis" %>
<%@ page import="service.EntityService" %>
<%@ page import="service.impl.DiagnosisServiceImpl" %>
<%@ page import="java.util.HashSet" %>
<%@ page import="model.Specialization" %>
<%@ page import="service.impl.SpecializationServiceImpl" %>
<%@ page import="model.Staff" %>
<%@ page import="service.impl.StaffServiceImpl" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>Staff</title>
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
</head>
<body>
<h2>Staff table</h2>
<table id="staff" border="1">
    <thead>
    <tr>
        <th>Name</th>
        <th>Specialization</th>
        <th>Action</th>
    </tr>
    </thead>
    <tbody id="staffContainer">
    <%
        EntityService<Staff> staffService = new StaffServiceImpl();
        HashSet<Staff> set = staffService.findAll();
    %>
    <% for (Staff c : set) { %>
    <tr class="row">
        <input class="staffId" type="hidden" value="<%=c.getStaffId()%>">
        <td><input class="staffName" readonly="readonly" type="text" value="<%=c.getFullName()%>"></td>
        <td>
            <%
                EntityService<Specialization> specService = new SpecializationServiceImpl();
                HashSet<Specialization> specSet = specService.findAll();
            %>
        <select class="selectSpecialization" disabled="disabled">
            <% for (Specialization p : specSet) {
                if(p.getSpecializationId()==c.getSpecialization().getSpecializationId()){%>>
            <option selected="selected" value="<%=p.getSpecializationId()%>"><%=p.toString()%></option>
            <%} else {%>
            <option value="<%=p.getSpecializationId()%>"><%=p.toString()%></option>
            <%}%>
            <%}%>
        </select>
        </td>

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
    <li><a href="specialization.jsp">Specialization</a> </li>
    <li><a href="examination.jsp">Examination</a> </li>
</div>
<script type="text/javascript" src="js/staffScript.js"></script>
</body>
</html>