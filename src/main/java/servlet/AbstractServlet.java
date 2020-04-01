package servlet;

import lombok.Data;
import lombok.EqualsAndHashCode;
import model.*;
import service.EntityService;
import service.impl.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@EqualsAndHashCode(callSuper = true)
@Data
public class AbstractServlet extends HttpServlet {
    private EntityService<Diagnosis> diagnosisService;
    private EntityService<Examination> examinationService;
    private EntityService<Patient> patientService;
    private EntityService<Staff> staffService;
    private EntityService<Specialization> specializationService;
    private EntityService<Position> positionService;

    @Override
    public void init() {
        diagnosisService = new DiagnosisServiceImpl();
        examinationService = new ExaminationServiceImpl();
        patientService = new PatientServiceImpl();
        staffService = new StaffServiceImpl();
        specializationService = new SpecializationServiceImpl();
        positionService = new PositionServiceImpl();
    }

    protected void redirectToAction(String uri, HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        response.sendRedirect(request.getContextPath() + uri);
    }

    void forward(String page, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher(page).forward(request, response);
    }

    protected String getStringParam(HttpServletRequest request, String param) {
        String paramValue = request.getParameter(param);
        if (paramValue == null) {
            return null;
        }
        return paramValue.trim();
    }
}
