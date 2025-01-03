package vn.edu.hust.soict.japango.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hust.soict.japango.common.enums.ActionType;
import vn.edu.hust.soict.japango.dto.history.DeleteHistoryResponseDTO;
import vn.edu.hust.soict.japango.dto.history.EditOutputRequestDTO;
import vn.edu.hust.soict.japango.dto.history.GetHistoryRequestDTO;
import vn.edu.hust.soict.japango.dto.history.HistoryDTO;
import vn.edu.hust.soict.japango.service.HistoryService;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/v1/history")
@RequiredArgsConstructor
public class HistoryController {
    private final HistoryService historyService;

    @GetMapping
    public ResponseEntity<Page<HistoryDTO>> getHistory(
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "action", required = false) ActionType actionType,
            @RequestParam(name = "from", required = false) LocalDate fromDate,
            @RequestParam(name = "to", required = false) LocalDate toDate,
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "${app.request.default-page-size}") int size
    ) {
        return ResponseEntity.ok(historyService.getHistory(GetHistoryRequestDTO.builder()
                .keyword(keyword)
                .actionType(actionType)
                .fromDate(fromDate)
                .toDate(toDate)
                .page(page)
                .size(size)
                .build()
        ));
    }

    @DeleteMapping
    public ResponseEntity<DeleteHistoryResponseDTO> deleteHistory() {
        return ResponseEntity.ok(historyService.deleteHistory());
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> deleteItem(@PathVariable String uuid) {
        historyService.deleteItem(uuid);
        return ResponseEntity.ok(null);
    }

    @PostMapping("/{uuid}/like")
    public ResponseEntity<Void> likeItem(@PathVariable String uuid) {
        historyService.likeItem(uuid);
        return ResponseEntity.ok(null);
    }

    @PostMapping("/{uuid}/unlike")
    public ResponseEntity<Void> unlikeItem(@PathVariable String uuid) {
        historyService.unlikeItem(uuid);
        return ResponseEntity.ok(null);
    }

    @PutMapping("/{uuid}/edit")
    public ResponseEntity<Void> editOutput(@PathVariable String uuid, @RequestBody EditOutputRequestDTO request) {
        historyService.editOutput(uuid, request);
        return ResponseEntity.ok(null);
    }
}
