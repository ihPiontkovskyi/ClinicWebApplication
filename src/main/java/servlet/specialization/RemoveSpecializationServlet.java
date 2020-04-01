package servlet.specializationServlet;

import model.Diagnosis;
import model.Specialization;
import servlet.AbstractServlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/DeleteSpecialization")
public class RemoveSpecializationServlet extends AbstractServlet {
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) {
        Specialization specialization = getSpecializationService().findById(Integer.parseInt(getStringParam(request,"id")));
        getSpecializationService().delete(specialization);
    }
}