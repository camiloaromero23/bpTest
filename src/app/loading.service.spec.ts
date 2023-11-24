import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';
import { BehaviorSubject } from 'rxjs';

describe('LoadingService', () => {
  let loadingService: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService],
    });

    loadingService = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(loadingService).toBeTruthy();
  });

  it('should set loading state correctly', () => {
    // Arrange
    const expectedLoadingState = true;

    // Act
    loadingService.setLoadingState(expectedLoadingState);

    // Assert
    loadingService.getLoadingState().subscribe((actualLoadingState) => {
      expect(actualLoadingState).toEqual(expectedLoadingState);
    });
  });

  it('should return BehaviorSubject from getLoadingState', () => {
    // Act
    const loadingStateSubject = loadingService.getLoadingState();

    // Assert
    expect(loadingStateSubject instanceof BehaviorSubject).toBe(true);
  });
});
