import * as d from '@declarations';
import { EVENT_FLAGS } from '@utils';
import { getHostRef } from '@platform';
import { BUILD } from '@build-conditionals';


export function createEvent(ref: d.RuntimeRef, name: string, flags: number) {
  const el = (BUILD.lazyLoad ? getHostRef(ref).$hostElement$ : ref) as d.HostElement;
  const eventMeta = {
    bubbles: !!(flags & EVENT_FLAGS.Bubbles),
    composed: !!(flags & EVENT_FLAGS.Composed),
    cancelable: !!(flags & EVENT_FLAGS.Cancellable)
  };

  return {
    emit: (detail: any) => el.dispatchEvent(
      new CustomEvent(name, { ...eventMeta, detail })
    )
  };
}