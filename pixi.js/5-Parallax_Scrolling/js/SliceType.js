/**
 * @name SliceType.js
 * @author William Woodard
 * @desc Class enumerator for front wall slice types
 *        @class {SliceType}
 *          @constant FRONT, BACK, STEP, DECORATION, WINDOW, GAP
 * @required none
 */
class SliceType {
  // Hopefully the ES7 specfication will give us better class implementation
  // Still have to put const/static outside of class, after it it declared (see bottom)
}

// Constants (Why do I still have to do this in ES6? Don't call these classes!)
SliceType.FRONT      = 0;
SliceType.BACK       = 1;
SliceType.STEP       = 2;
SliceType.DECORATION = 3;
SliceType.WINDOW     = 4;
SliceType.GAP        = 5;