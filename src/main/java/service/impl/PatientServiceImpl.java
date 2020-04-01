package service.impl;

import dto.EntityDTO;
import model.Patient;
import service.EntityService;

import java.util.HashSet;

public class PatientServiceImpl implements EntityService<Patient> {
    private static final EntityDTO<Patient> PATIENT_DTO = new EntityDTO<>(Patient.class);

    @Override
    public HashSet<? extends Patient> findAll() {
        return PATIENT_DTO.findAll();
    }

    @Override
    public void delete(Patient patient) {
        PATIENT_DTO.delete(patient);
    }

    @Override
    public void saveOrUpdate(Patient patient) {
        PATIENT_DTO.saveOrUpdate(patient);
    }

    @Override
    public Patient findById(Integer id) {
        return PATIENT_DTO.findById(id);
    }

}
