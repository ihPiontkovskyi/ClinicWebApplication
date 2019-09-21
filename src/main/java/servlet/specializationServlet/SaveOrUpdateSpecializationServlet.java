package servlet.specializationServlet;

import model.Specialization;
import servlet.AbstractServlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/SaveOrUpdateSpecialization")
public class SaveOrUpdateSpecializationServlet extends AbstractServlet {
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) {

        Specialization specialization = new Specialization();
        specialization.setSpecializationId(Integer.parseInt(getStringParam(request, "id")));
        specialization.setSpecializationName(getStringParam(request, "name"));
        getSpecializationService().saveOrUpdate(specialization);
    }
}