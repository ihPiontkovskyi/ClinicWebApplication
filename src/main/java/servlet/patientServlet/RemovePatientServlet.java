package servlet.patientServlet;

import model.Diagnosis;
import model.Patient;
import servlet.AbstractServlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/DeletePatient")
public class RemovePatientServlet extends AbstractServlet {
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) {
        Patient currPatient = getPatientService().findById(Integer.parseInt(getStringParam(request,"id")));
        getPatientService().delete(currPatient);
    }
}