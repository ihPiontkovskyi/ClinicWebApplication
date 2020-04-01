package dto;

import lombok.Data;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import util.HibernateSessionFactoryUtil;

import java.util.HashSet;
import java.util.concurrent.atomic.AtomicReference;

@Data
public class EntityDTO<T> {
    HashSet<T> set = new HashSet<>();
    private Class<? extends T> typeParameterClass;

    public EntityDTO(Class<? extends T> typeParameterClass) {
        this.typeParameterClass = typeParameterClass;
    }

    public HashSet<? extends T> findAll() {
        set.clear();
        HibernateSessionFactoryUtil.doInHibernateSession(session -> {
            Query<? extends T> query = session.createQuery("from " + typeParameterClass.getCanonicalName(), typeParameterClass);
            set.addAll(query.list());
        });
        return set;
    }

    public T findById(Integer id) {
        AtomicReference<T> res = new AtomicReference<>();
        HibernateSessionFactoryUtil.doInHibernateSession(session -> res.set(session.get(typeParameterClass, id)));
        return res.get();
    }

    public void delete(T t) {
        HibernateSessionFactoryUtil.doInHibernateSession(session -> {
            Transaction tx1 = session.beginTransaction();
            session.delete(t);
            tx1.commit();
        });
    }

    public void saveOrUpdate(T t) {
        HibernateSessionFactoryUtil.doInHibernateSession(session -> {
            Transaction tx1 = session.beginTransaction();
            session.saveOrUpdate(t);
            tx1.commit();
        });
    }
}
