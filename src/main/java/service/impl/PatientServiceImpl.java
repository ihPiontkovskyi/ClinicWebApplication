package service.impl;

import dto.EntityDTO;
import model.Patient;
import service.EntityService;

import java.util.HashSet;

public class PatientServiceImpl implements EntityService<Patient> {
    private EntityDTO<Patient> patientDTO = new EntityDTO<>(Patient.class);

    @Override
    public HashSet findAll() {
        return patientDTO.findAll();
    }

    @Override
    public void delete(Patient patient) {
        patientDTO.delete(patient);
    }

    @Override
    public void saveOrUpdate(Patient patient) {
        patientDTO.saveOrUpdate(patient);
    }

    @Override
    public Patient findById(Integer id) {
        return patientDTO.findById(id);
    }

}
