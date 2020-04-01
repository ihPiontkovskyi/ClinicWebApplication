package service.impl;

import dto.EntityDTO;
import model.Diagnosis;
import service.EntityService;

import java.util.HashSet;

public class DiagnosisServiceImpl implements EntityService<Diagnosis> {
    private static final EntityDTO<Diagnosis> DIAGNOSIS_DTO = new EntityDTO<>(Diagnosis.class);

    @Override
    public HashSet<? extends Diagnosis> findAll() {
        return DIAGNOSIS_DTO.findAll();
    }

    @Override
    public void delete(Diagnosis diagnosis) {
        DIAGNOSIS_DTO.delete(diagnosis);
    }

    @Override
    public void saveOrUpdate(Diagnosis t) {
        DIAGNOSIS_DTO.saveOrUpdate(t);
    }

    @Override
    public Diagnosis findById(Integer id) {
        return DIAGNOSIS_DTO.findById(id);
    }

}
