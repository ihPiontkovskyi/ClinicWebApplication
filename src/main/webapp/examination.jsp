<%@ page import="model.Diagnosis" %>
<%@ page import="model.Examination" %>
<%@ page import="model.Patient" %>
<%@ page import="model.Staff" %>
<%@ page import="service.EntityService" %>
<%@ page import="service.impl.DiagnosisServiceImpl" %>
<%@ page import="service.impl.ExaminationServiceImpl" %>
<%@ page import="service.impl.PatientServiceImpl" %>
<%@ page import="service.impl.StaffServiceImpl" %>
<%@ page import="java.util.HashSet" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>Examination</title>
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="http://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
</head>
<body>
<h2>Examinations table</h2>
<table id="examination" border="1">
    <thead>
    <tr>
        <th>Patient</th>
        <th>Examination Date</th>
        <th>Diagnosis</th>
        <th>Term of treatment</th>
        <th>Doctor</th>
        <th>Action</th>
    </tr>
    </thead>
    <tbody id="examinationContainer">
    <%
        EntityService<Examination> examinationService = new ExaminationServiceImpl();
        HashSet<Examination> set = examinationService.findAll();
    %>
    <% for (Examination c : set) { %>
    <tr class="row">
        <input class="examinationId" type="hidden" readonly="readonly" value="<%=c.getExaminationId()%>">
        <td>
            <%
                EntityService<Patient> patientService = new PatientServiceImpl();
                HashSet<Patient> patientSet = patientService.findAll();
            %>

            <select class="selectPatient" disabled="disabled">
                <% for (Patient p : patientSet) {
                    if(p.getPatientId()==c.getPatient().getPatientId()){%>>
                <option selected="selected" value="<%=p.getPatientId()%>"><%=p.toString()%></option>
                <%} else {%>
                <option value="<%=p.getPatientId()%>"><%=p.toString()%></option>
                <%}%>
                <%}%>
            </select>
        </td>

        <td>
            <input id="datePicker" readonly="readonly" type="text" value="<%=c.getExaminationDate()%>">
        </td>

        <td>
            <%
                EntityService<Diagnosis> diagnosisService = new DiagnosisServiceImpl();
                HashSet<Diagnosis> diagnosisSet = diagnosisService.findAll();
            %>

            <select class="selectDiagnosis"  disabled="disabled">
                <% for (Diagnosis p : diagnosisSet) {
                    if(p.getDiagnosisId()==c.getDiagnosis().getDiagnosisId()){%>>
                <option selected="selected" value="<%=p.getDiagnosisId()%>"><%=p.toString()%></option>
                <%} else {%>
                <option value="<%=p.getDiagnosisId()%>"><%=p.toString()%></option>
                <%}%>
                <%}%>
            </select>
        </td>
        <td>
            <input class="inputTerm" readonly="readonly" type="text" value="<%=c.getTermOfTreatment()%>">
        </td>
        <td>
            <%
                EntityService<Staff> staffService = new StaffServiceImpl();
                HashSet<Staff> staffSet = staffService.findAll();
            %>

            <select class="selectStaff" disabled="disabled">
                <% for (Staff p : staffSet) {
                    if(p.getStaffId()==c.getStaff().getStaffId()){%>>
                    <option selected="selected" value="<%=p.getStaffId()%>"><%=p.toString()%></option>
                <%} else {%>
                 <option value="<%=p.getStaffId()%>"><%=p.toString()%></option>
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
    <li><a href="staff.jsp">Staff</a> </li>
</div>
<script type="text/javascript" src="js/examinationScript.js"></script>
</body>
</html>
