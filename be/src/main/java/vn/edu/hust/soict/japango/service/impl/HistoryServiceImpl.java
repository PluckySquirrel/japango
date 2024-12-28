package vn.edu.hust.soict.japango.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import vn.edu.hust.soict.japango.common.enums.ActionType;
import vn.edu.hust.soict.japango.common.enums.SaveType;
import vn.edu.hust.soict.japango.common.utils.SecurityUtils;
import vn.edu.hust.soict.japango.dto.history.DeleteHistoryResponse;
import vn.edu.hust.soict.japango.dto.history.GetHistoryRequest;
import vn.edu.hust.soict.japango.dto.history.HistoryDTO;
import vn.edu.hust.soict.japango.entity.History;
import vn.edu.hust.soict.japango.entity.SavedResult;
import vn.edu.hust.soict.japango.exception.CustomExceptions;
import vn.edu.hust.soict.japango.repository.HistoryRepository;
import vn.edu.hust.soict.japango.repository.SavedResultRepository;
import vn.edu.hust.soict.japango.service.HistoryService;
import vn.edu.hust.soict.japango.service.mapper.HistoryMapper;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class HistoryServiceImpl implements HistoryService {
    private final SecurityUtils securityUtils;
    private final HistoryRepository historyRepository;
    private final HistoryMapper historyMapper;
    private final SavedResultRepository savedResultRepository;

    @Override
    public Page<HistoryDTO> getHistory(GetHistoryRequest request) {
        Long userId;
        if ((userId = securityUtils.getUserId()) == null) {
            throw CustomExceptions.LOGIN_REQUIRED_EXCEPTION;
        }
        List<ActionType> actionTypes;
        if (request.getActionType() == null) {
            actionTypes = new ArrayList<>(Arrays.asList(ActionType.values()));
        } else {
            actionTypes = List.of(request.getActionType());
        }
        return historyRepository
                .findByUserIdAndActionInAndCreatedAtBetween(userId, actionTypes, request.getFromDateTime(), request.getToDateTime(), request.getPageable())
                .map(historyMapper::toDTO);
    }

    @Override
    public DeleteHistoryResponse deleteHistory() {
        long count = historyRepository.count();
        historyRepository.deleteAll();
        return DeleteHistoryResponse.builder().numberDeleted(count).build();
    }

    @Override
    public void likeItem(String uuid) {
        if (savedResultRepository.existsByHistoryUuidAndSaveType(uuid, SaveType.LIKED))
            return;

        History history = historyRepository.findByUuid(uuid)
                .orElseThrow(() -> CustomExceptions.HISTORY_ITEM_NOT_EXISTS_EXCEPTION);

        SavedResult savedResult = historyMapper.toSavedResult(history);
        savedResult.setSaveType(SaveType.LIKED);
        savedResultRepository.save(savedResult);
    }

    @Override
    public void unlikeItem(String uuid) {
        savedResultRepository.deleteByHistoryUuidAndSaveType(uuid, SaveType.LIKED);
    }
}
