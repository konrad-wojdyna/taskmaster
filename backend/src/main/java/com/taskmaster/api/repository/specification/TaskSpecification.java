package com.taskmaster.api.repository.specification;

import com.taskmaster.api.entity.Task;
import com.taskmaster.api.entity.TaskPriority;
import com.taskmaster.api.entity.TaskStatus;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;


public class TaskSpecification {

    public static Specification<Task> filterTasks(
            Long userId,
            TaskStatus status,
            TaskPriority priority,
            Long categoryId,
            Boolean overdue
    ){
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            predicates.add(cb.equal(root.get("user").get("id"), userId));

            if(status != null){
                predicates.add(cb.equal(root.get("status"), status));
            }

            if(priority != null){
                predicates.add(cb.equal(root.get("priority"), priority));
            }

            if(categoryId != null){
                predicates.add(cb.equal(root.get("category").get("id"), categoryId));
            }

            if(Boolean.TRUE.equals(overdue)){
                predicates.add(cb.lessThan(root.get("dueDate"), OffsetDateTime.now()));
                predicates.add(cb.notEqual(root.get("status"), TaskStatus.COMPLETED));
            }

            assert query != null;
            if(Long.class != query.getResultType()){
                root.fetch("category", JoinType.LEFT);
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
