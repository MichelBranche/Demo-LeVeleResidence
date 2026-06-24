import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { SlopeWidgetLabels } from '../../lib/slope';

type RoomGuests = {
  adults: number;
  children: number;
};

type SlopeGuestsSelectorProps = {
  labels: SlopeWidgetLabels;
  slopeLocale: string;
};

const MIN_ADULTS = 1;
const MAX_ADULTS = 99;
const MAX_CHILDREN = 99;
const MAX_ROOMS = 99;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function Stepper({
  value,
  min,
  max,
  onDecrement,
  onIncrement,
}: {
  value: number;
  min: number;
  max: number;
  onDecrement: () => void;
  onIncrement: () => void;
}) {
  return (
    <div className="slope-guests-stepper">
      <button
        type="button"
        className="slope-decrement-button"
        aria-label="−"
        disabled={value <= min}
        onClick={onDecrement}
      >
        <span>-</span>
      </button>
      <input className="slope-stepper-value" readOnly type="text" value={value} tabIndex={-1} />
      <button
        type="button"
        className="slope-increment-button"
        aria-label="+"
        disabled={value >= max}
        onClick={onIncrement}
      >
        <span>+</span>
      </button>
    </div>
  );
}

export function SlopeGuestsSelector({ labels, slopeLocale }: SlopeGuestsSelectorProps) {
  const panelId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [panelStyle, setPanelStyle] = useState<{ top: number; left: number; width: number } | null>(
    null,
  );
  const [rooms, setRooms] = useState<RoomGuests[]>([{ adults: 2, children: 0 }]);

  const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
  const totalChildren = rooms.reduce((sum, room) => sum + room.children, 0);

  const updatePanelPosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const width = Math.min(300, Math.max(260, rect.width));
    const left = Math.min(
      Math.max(12, rect.left),
      window.innerWidth - width - 12,
    );

    setPanelStyle({
      top: rect.bottom + window.scrollY + 8,
      left: left + window.scrollX,
      width,
    });
  }, []);

  const openPanel = useCallback(() => {
    updatePanelPosition();
    setOpen(true);
  }, [updatePanelPosition]);

  const closePanel = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      closePanel();
    };

    const handleReposition = () => {
      updatePanelPosition();
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);

    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [closePanel, open, updatePanelPosition]);

  const updateRoom = (index: number, patch: Partial<RoomGuests>) => {
    setRooms((current) =>
      current.map((room, roomIndex) =>
        roomIndex === index ? { ...room, ...patch } : room,
      ),
    );
  };

  const addRoom = () => {
    setRooms((current) => {
      if (current.length >= MAX_ROOMS) return current;
      return [...current, { adults: 2, children: 0 }];
    });
  };

  const removeRoom = () => {
    setRooms((current) => {
      if (current.length <= 1) return current;
      return current.slice(0, -1);
    });
  };

  return (
    <>
      {rooms.map((room, roomIndex) => (
        <div key={`room-fields-${roomIndex}`} hidden aria-hidden>
          <input
            type="hidden"
            name={`reservation[guestCounts][${roomIndex}][adults]`}
            value={room.adults}
            readOnly
          />
          {Array.from({ length: room.children }, (_, childIndex) => (
            <input
              key={childIndex}
              type="hidden"
              name={`reservation[guestCounts][${roomIndex}][childrenAges][${childIndex + 1}]`}
              value="0"
              readOnly
            />
          ))}
        </div>
      ))}

      <div
        ref={triggerRef}
        className="slope-guests-selector__trigger"
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={openPanel}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openPanel();
          }
          if (event.key === 'Escape') closePanel();
        }}
      >
        <div className="slope-rooms-count-container">
          <span className="slope-rooms-label">{labels.lodgings}</span>
          <span className="slope-rooms-count">{rooms.length}</span>
        </div>

        <div className="slope-guests-count-container">
          <span className="slope-guests-label">{labels.guests}</span>
          <span className="slope-adults-count">{totalAdults}</span>
          <span className="slope-guests-adults">{labels.adults}</span>
          <span style={{ fontSize: 16 }}> - </span>
          <span className="slope-children-count">{totalChildren}</span>
          <span className="slope-guests-children">{labels.children}</span>
        </div>
      </div>

      {open && panelStyle
        ? createPortal(
            <div
              ref={panelRef}
              id={panelId}
              className="slope-guests-selector__panel slope-stepper-container"
              data-lang={slopeLocale}
              style={{
                display: 'block',
                position: 'absolute',
                top: panelStyle.top,
                left: panelStyle.left,
                width: panelStyle.width,
              }}
              role="dialog"
              aria-label={labels.guests}
            >
              <div className="slope-rooms-stepper-container" data-container="room">
                <span className="slope-rooms-label">{labels.lodgings}</span>
                <Stepper
                  value={rooms.length}
                  min={1}
                  max={MAX_ROOMS}
                  onDecrement={removeRoom}
                  onIncrement={addRoom}
                />
              </div>

              {rooms.map((room, roomIndex) => (
                <div key={roomIndex} className="slope-room-container" data-container="guests">
                  <div className="slope-horizontal-separator" />
                  <p className="slope-room-label">
                    {labels.lodging} {roomIndex + 1}
                  </p>

                  <div className="slope-guests-count-row slope-padding-top">
                    <span className="slope-adults-label">{labels.adults}</span>
                    <Stepper
                      value={room.adults}
                      min={MIN_ADULTS}
                      max={MAX_ADULTS}
                      onDecrement={() =>
                        updateRoom(roomIndex, {
                          adults: clamp(room.adults - 1, MIN_ADULTS, MAX_ADULTS),
                        })
                      }
                      onIncrement={() =>
                        updateRoom(roomIndex, {
                          adults: clamp(room.adults + 1, MIN_ADULTS, MAX_ADULTS),
                        })
                      }
                    />
                  </div>

                  <div className="slope-guests-count-row">
                    <div>
                      <span className="slope-children-label">{labels.children}</span>
                      <span className="slope-children-age">{labels.childrenAge}</span>
                    </div>
                    <Stepper
                      value={room.children}
                      min={0}
                      max={MAX_CHILDREN}
                      onDecrement={() =>
                        updateRoom(roomIndex, {
                          children: clamp(room.children - 1, 0, MAX_CHILDREN),
                        })
                      }
                      onIncrement={() =>
                        updateRoom(roomIndex, {
                          children: clamp(room.children + 1, 0, MAX_CHILDREN),
                        })
                      }
                    />
                  </div>
                </div>
              ))}

              <div className="slope-horizontal-separator" data-separator="buttons" />
              <div
                className="slope-guests-buttons-container"
                data-container="stepper-container-buttons"
              >
                <button
                  type="button"
                  className="slope-cancel-guests"
                  onClick={() => {
                    setRooms([{ adults: 2, children: 0 }]);
                    closePanel();
                  }}
                >
                  {labels.cancel}
                </button>
                <button type="button" className="slope-save-guests" onClick={closePanel}>
                  {labels.save}
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
