package service.impl;

import dto.EntityDTO;
import model.Diagnosis;
import service.EntityService;

import java.util.HashSet;

public class DiagnosisServiceImpl implements EntityService<Diagnosis> {
    private EntityDTO diagnosisDTO = new EntityDTO<>(Diagnosis.class);

    @Override
    public HashSet findAll() {
        return diagnosisDTO.findAll();
    }

    @Override
    public void delete(Diagnosis diagnosis) {
        diagnosisDTO.delete(diagnosis);
    }

    @Override
    public void saveOrUpdate(Diagnosis t) {
        diagnosisDTO.saveOrUpdate(t);
    }

    @Override
    public Diagnosis findById(Integer id) {
        return (Diagnosis)diagnosisDTO.findById(id);
    }
}
