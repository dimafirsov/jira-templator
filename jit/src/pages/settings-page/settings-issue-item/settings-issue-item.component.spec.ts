import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DEFAULT_TEMPLATE } from '../../../constants';
import { SettingsService } from '../../../services/settings.service';
import { StorageService } from '../../../services/storage.service';

import { SettingsIssueItemComponent } from './settings-issue-item.component';

describe('SettingsIssueItemComponent', () => {
  let component: SettingsIssueItemComponent;
  let fixture: ComponentFixture<SettingsIssueItemComponent>;
  const saveIssueSelector = '#jit-save-issue';
  const editIconSelector = '.edit-icon';
  const removeIconSelector = '.remove-icon';
  const issueItemInputSelector = '.issue-item.issue-item-input';
  const issueItemSelector = '.issue-item';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsIssueItemComponent ],
      providers: [StorageService, SettingsService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsIssueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When OnChanges is run', () => {
    it('should quit the editable mode in case the showOptions wasnt triggered in the first place', () => {
        component.showOptions = true;
        component.editable = true;
        fixture.detectChanges();

        component.ngOnChanges(
            {
                showOptions: {
                    currentValue: false,
                    firstChange: true,
                    isFirstChange: () => true,
                    previousValue: true,
                }
            }
        );

        expect(component.editable).toBeFalsy();
    });
  });

  describe('When OnInit is run', () => {
    it('should subscribe to current issues', fakeAsync(
        () => {
            component.ngOnInit();
            component.settings.currentIssue$.next({...DEFAULT_TEMPLATE}.issueTypes.Epic);
            tick();
            expect(component.currentIssueProperties.template).toEqual('epic_template');
        }
    ));
  });

  describe('When user messes around with edit options', () => {
      it('should not show edit option if showOptions is false', () => {
        component.showOptions = false;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.issue-item-edit-options'))).toBeFalsy();
      });

      it('should not show edit icon when not editable', () => {
        component.editable = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(editIconSelector))).toBeFalsy();
      });

      it('should not show remove icon when not removable', () => {
        component.removable = false;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(removeIconSelector))).toBeFalsy();
      });

      it('should not show remove icon when not removable', () => {
        component.removable = false;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(removeIconSelector))).toBeFalsy();
      });

      it('should show the SAVE button if editable', () => {
        component.editable = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(saveIssueSelector))).toBeTruthy();
      });

      it('should render issue input if editable and acts like property', () => {
        component.editable = true;
        component.property = 'title';
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(issueItemInputSelector))).toBeTruthy();
      });

      it('should NOT render issue input if NOT editable and acts like property', () => {
        component.editable = false;
        component.property = 'title';
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css(issueItemInputSelector))).toBeFalsy();
      });

      it('should call handleInputChange() on input value change', () => {
        const spy = spyOn(component, 'handleInputChange');
        component.editable = true;
        component.property = 'title';
        fixture.detectChanges();

        const input: HTMLInputElement = fixture.debugElement.query(By.css(issueItemInputSelector)).nativeElement;
        input.value = 'hello!';
        input.dispatchEvent(new Event('input'));

        expect(spy).toHaveBeenCalled();
      });

      it('should call handleEdit() on SAVE button click', () => {
        const spy = spyOn(component, 'handleEdit');
        component.editable = true;
        fixture.detectChanges();
        fixture.debugElement.nativeElement.querySelector(saveIssueSelector).click();

        expect(spy).toHaveBeenCalled();
      });

      it('should call handleEdit() on edit icon click', () => {
        const spy = spyOn(component, 'handleEdit');
        fixture.debugElement.nativeElement.querySelector(editIconSelector).click();

        expect(spy).toHaveBeenCalled();
      });

      it('should call removeIssueType() on remove icon click', () => {
        const spy = spyOn(component, 'removeIssueType');
        component.removable = true;
        fixture.detectChanges();
        fixture.debugElement.nativeElement.querySelector(removeIconSelector).click();

        expect(spy).toHaveBeenCalled();
      });

      it('should call handleItemClick() on issue item click', () => {
        const spy = spyOn(component, 'handleItemClick');
        component.editable = false;
        fixture.detectChanges();
        fixture.debugElement.nativeElement.querySelector(issueItemSelector).click();

        expect(spy).toHaveBeenCalled();
      });
  });

  describe('handleInputChange()', () => {
      it('should set to empty string when focused', () => {
          const event = {target: { value: '' }};
          component.handleInputChange(event);
          fixture.detectChanges();
          expect(component.inputValue).toBeFalsy();
      });

      it('should set to truthy value', () => {
          const event = {target: { value: 'hello' }};
          component.handleInputChange(event);
          fixture.detectChanges();
          expect(component.inputValue).toEqual('hello');
      });
  });

  describe('handleItemClick()', () => {
      it('should message the inputType to currentIssueType$ on call', () => {
          const spy = spyOn(component.settings.currentIssueType$, 'next');
          component.inputValue = 'Epic';
          component.type = '';
          component.handleItemClick();
          fixture.detectChanges();
          expect(spy).toHaveBeenCalledWith(component.inputValue);
      });

      it('should message the "type" to currentIssueType$ on call if "inputType" is falsy', () => {
          const spy = spyOn(component.settings.currentIssueType$, 'next');
          component.inputValue = '';
          component.type = 'Epic';
          component.handleItemClick();
          fixture.detectChanges();
          expect(spy).toHaveBeenCalledWith(component.type);
      });

      it('should update the storage with the latest issue type', fakeAsync(
        () => {
            const spy = spyOn(component.settings.currentIssue$, 'next');
            component.inputValue = 'Epic';
            component.type = '';
            component.handleItemClick();
            fixture.detectChanges();
            tick();
            expect(spy).toHaveBeenCalledWith([...component.storage.current$.value.issueTypes[component.inputValue]]);
          }
      ));

      it('should update the storage with the latest issue type', fakeAsync(
        () => {
            const spy = spyOn(component.settings.currentIssue$, 'next');
            component.inputValue = '';
            component.type = 'Epic';
            component.handleItemClick();
            fixture.detectChanges();
            tick();
            expect(spy).toHaveBeenCalledWith([...component.storage.current$.value.issueTypes[component.type]]);
          }
      ));
  });

  // TODO: figure out why removing from a copy of default template actually mutates the
  // DEFAULT_TEMPLATE value :(
  xdescribe('removeIssueType()', () => {
      const restore = fakeAsync(
            () => {
                component.storage.current$.next({...DEFAULT_TEMPLATE});
                tick();
            }
        );
      beforeEach(restore);
      afterEach(restore);

      it('should call setStorage() when called', () => {
        const spy = spyOn(component.storage, 'setStorage');
        component.removeIssueType('Bug');

        expect(spy).toHaveBeenCalledWith(component.storage.current$.value);
      });

      it('should actually remove the given key', () => {
          console.log('>>> component.storage.current$.value.issueTypes', component.storage.current$.value.issueTypes);
          const oldLength = Object.keys(component.storage.current$.value.issueTypes).length;
          component.removeIssueType('Bug');
          const newLength = Object.keys(component.storage.current$.value.issueTypes).length;

          expect(newLength).toBeLessThan(oldLength);
      });
  });

  describe('handleEdit() > ', () => {
      describe('When not editable ', () => {
          it('should change editable state if not editable', () => {
            component.editable = false;
            fixture.detectChanges();
            component.handleEdit();

            expect(component.editable).toBeTrue();
          });

          it('should NOT call setStorage() in the end', () => {
            const spy = spyOn(component.storage, 'setStorage');
            component.handleEdit();

            expect(spy).not.toHaveBeenCalled();
        });
      });

      describe('When editable ', () => {
          beforeEach(() => component.editable = true);

          describe('and input value is truthy ', () => {
            beforeEach(() => component.inputValue = 'hello');

            describe('and there is no such input type in the storage ', () => {

                it('should call setStorage() in the end', () => {
                    const spy = spyOn(component.storage, 'setStorage');
                    component.handleEdit();

                    expect(spy).toHaveBeenCalled();
                });

                describe('and the property input exists and is different from the input value ', () => {
                    it('should notify the currentIssue$ pipeline with the new value', () => {
                        const spy = spyOn(component.settings.currentIssue$, 'next');
                        component.type = 'Story';
                        component.property = 'title';
                        component.handleEdit();

                        expect(spy).toHaveBeenCalled();
                    });
                });
            });
        });
      });
  });
});
