package service;

import java.util.HashSet;
import java.util.List;

public interface EntityService<T> {

    HashSet<? extends T> findAll();

    void delete(T t);

    void saveOrUpdate(T t);

    T findById(Integer id);

}
