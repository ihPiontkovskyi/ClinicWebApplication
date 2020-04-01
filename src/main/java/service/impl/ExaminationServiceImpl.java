package service.impl;

import dto.EntityDTO;
import model.Examination;
import service.EntityService;

import java.util.HashSet;

public class ExaminationServiceImpl implements EntityService<Examination> {
    private static final EntityDTO<Examination> EXAMINATION_DTO = new EntityDTO<>(Examination.class);

    @Override
    public HashSet<? extends Examination> findAll() {
        return EXAMINATION_DTO.findAll();
    }

    @Override
    public void delete(Examination examination) {
        EXAMINATION_DTO.delete(examination);
    }

    @Override
    public void saveOrUpdate(Examination examination) {
        EXAMINATION_DTO.saveOrUpdate(examination);
    }

    @Override
    public Examination findById(Integer id) {
        return EXAMINATION_DTO.findById(id);
    }
}
