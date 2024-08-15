import { Directive, ElementRef, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { fromEvent, merge, take } from 'rxjs';

@Directive({
    standalone: true,
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[longPress]',
})
export class HoldToCopyDirective {
    @Input() thresholdSeconds = 1;

    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onLongPress: EventEmitter<boolean> = new EventEmitter();

    private readonly elementRef = inject(ElementRef);
    private interval:any;

    @HostListener('mousedown', ['$event'])
    @HostListener('touchstart', ['$event'])
    onMouseDown() {
        let val = 0;
        this.cancelLongPress$.pipe(take(1)).subscribe(() => {
            clearInterval(this.interval);
            val = 0;
        });
        clearInterval(this.interval);
        
        this.interval = setInterval(() => {
            if (++val > (this.thresholdSeconds * 10)) {
                clearInterval(this.interval);
                val = 0;
                this.onLongPress.emit(true);
            }
        }, 100);
    }

    private cancelLongPress$ = merge(
        fromEvent(this.elementRef.nativeElement, 'touchend'),
        fromEvent<MouseEvent>(this.elementRef.nativeElement, 'mouseup')
    );
}