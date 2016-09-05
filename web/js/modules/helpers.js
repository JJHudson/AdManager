/**
 * A collection of small functions to help the ad along it's merry little way
 */

define(function () {
	function mergeObjects(objectA, objectB) {
		$.extend(objectA, objectB);

		return objectA;
	}

    return {
		mergeObjects: mergeObjects,

        _id: 'helpers'
    }
});