package service.impl;

import dto.EntityDTO;
import model.Position;
import service.EntityService;

import java.util.HashSet;

public class PositionServiceImpl implements EntityService<Position> {
    private EntityDTO<Position> positionDTO = new EntityDTO<>(Position.class);

    @Override
    public HashSet findAll() {
        return positionDTO.findAll();
    }

    @Override
    public void delete(Position position) {
        positionDTO.delete(position);
    }

    @Override
    public void saveOrUpdate(Position position) {
        positionDTO.saveOrUpdate(position);
    }

    @Override
    public Position findById(Integer id) {
        return positionDTO.findById(id);
    }
}
