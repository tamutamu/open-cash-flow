package com.ferrarib.opencf.repository;

import com.ferrarib.opencf.model.charts.DailyBalance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Created by bruno on 3/1/16.
 */
@Repository
public interface DailyBalances extends JpaRepository<DailyBalance, Date> {

    List<DailyBalance> findTop15ByOrderByDateDesc();
}
