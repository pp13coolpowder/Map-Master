const isPointInsidePolygon = (point, polygon) => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0];
      const yi = polygon[i][1];
      const xj = polygon[j][0];
      const yj = polygon[j][1];
  
      const intersect = ((yi > point[1]) !== (yj > point[1])) &&
        (point[0] < ((xj - xi) * (point[1] - yi)) / (yj - yi) + xi);
  
      if (intersect) inside = !inside;
    }
  
    return inside;
  }

function checkCoordinates(coordinates, targetLatitude, targetLongitude) {
    const point = [targetLongitude, targetLatitude];
  
    for (const area of coordinates) {
      const polygon = area.coordinates[0];
      if (isPointInsidePolygon(point, polygon)) {
        return area.ADM3_TH;
      }
    }
    return 'ไม่พบข้อมูล';
  }

export default checkCoordinates