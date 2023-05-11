import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { BreakpointService, ICON_TYPE } from '@spartacus/storefront';
import { asapScheduler, BehaviorSubject, interval, Observable, of } from 'rxjs';
import { delayWhen, observeOn, switchMap } from 'rxjs/operators';

@Component({
  selector: 'refinement-facet',
  templateUrl: './refinement-facet.component.html',
  styleUrls: ['./refinement-facet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefinementFacetComponent {
  iconTypes = ICON_TYPE;

  private CLOSE_DELAY = 300;

  @ViewChild('trigger') trigger: ElementRef<HTMLElement>;

  private open$ = new BehaviorSubject(false);

  isOpen$: Observable<boolean> = this.breakpointService.breakpoint$.pipe(
    observeOn(asapScheduler),
    switchMap(() => (this.hasTrigger ? this.open$ : of(true))),
    delayWhen((launched) => interval(launched ? 0 : this.CLOSE_DELAY))
  );

  isActive$ = this.open$.pipe(observeOn(asapScheduler));

  constructor(protected breakpointService: BreakpointService) {}

  launch() {
    this.open$.next(true);
  }

  close() {
    this.open$.next(false);
    this.trigger.nativeElement.focus();
  }

  get hasTrigger() {
    return this.trigger.nativeElement.offsetParent !== null;
  }
}
