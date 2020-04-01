package servlet.patientServlet;

import model.Diagnosis;
import model.Patient;
import servlet.AbstractServlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Date;

@WebServlet("/SaveOrUpdatePatient")
public class SaveOrUpdateDiagnosisServlet extends AbstractServlet {
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) {
        Patient patient = new Patient();
        patient.setPatientId(Integer.parseInt(getStringParam(request,"id")));
        patient.setPatientFirstName(getStringParam(request,"firstName"));
        patient.setPatientLastName(getStringParam(request,"lastName"));
        patient.setPatientDateOfBirth(Date.valueOf(getStringParam(request,"date")));
        getPatientService().saveOrUpdate(patient);
        forward("patient.jsp",request,response);
    }
}