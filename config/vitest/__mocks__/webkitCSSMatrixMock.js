window.WebKitCSSMatrix = window.WebKitCSSMatrix || class WebKitCSSMatrix {
  constructor(matrix) {
    this.m11 = 1;
    this.m12 = 0;
    this.m13 = 0;
    this.m14 = 0;
    this.m21 = 0;
    this.m22 = 1;
    this.m23 = 0;
    this.m24 = 0;
    this.m31 = 0;
    this.m32 = 0;
    this.m33 = 1;
    this.m34 = 0;
    this.m41 = 0;
    this.m42 = 0;
    this.m43 = 0;
    this.m44 = 1;
  }
  
  multiply(other) {
    return new WebKitCSSMatrix();
  }
  
  inverse() {
    return new WebKitCSSMatrix();
  }
  
  translate(x, y, z) {
    return new WebKitCSSMatrix();
  }
  
  scale(x, y, z) {
    return new WebKitCSSMatrix();
  }
  
  rotate(x, y, z) {
    return new WebKitCSSMatrix();
  }
  
  rotateAxisAngle(x, y, z, angle) {
    return new WebKitCSSMatrix();
  }
  
  skewX(angle) {
    return new WebKitCSSMatrix();
  }
  
  skewY(angle) {
    return new WebKitCSSMatrix();
  }
  
  toString() {
    return 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)';
  }
};
