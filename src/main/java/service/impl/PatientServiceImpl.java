package service.impl;

import dto.EntityDTO;
import model.Patient;
import service.EntityService;

import java.util.HashSet;

public class PatientServiceImpl implements EntityService<Patient> {
    private EntityDTO examinationDTO = new EntityDTO<>(Patient.class);

    @Override
    public HashSet findAll() {
        return examinationDTO.findAll();
    }

    @Override
    public void delete(Patient patient) {
        examinationDTO.delete(patient);
    }

    @Override
    public void saveOrUpdate(Patient patient) {
        examinationDTO.saveOrUpdate(patient);
    }

    @Override
    public Patient findById(Integer id) {
        return (Patient) examinationDTO.findById(id);
    }
}
