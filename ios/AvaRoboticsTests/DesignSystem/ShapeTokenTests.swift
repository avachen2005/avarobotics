import XCTest
@testable import AvaRobotics

final class ShapeTokenTests: XCTestCase {

    // MARK: - Corner Radius

    func testCornerRadiusValues() {
        XCTAssertEqual(ShapeToken.CornerRadius.none, 0)
        XCTAssertEqual(ShapeToken.CornerRadius.sm, 6)
        XCTAssertEqual(ShapeToken.CornerRadius.md, 8)
        XCTAssertEqual(ShapeToken.CornerRadius.lg, 12)
        XCTAssertEqual(ShapeToken.CornerRadius.xl, 16)
        XCTAssertEqual(ShapeToken.CornerRadius.xxl, 24)
        XCTAssertEqual(ShapeToken.CornerRadius.xxxl, 28)
        XCTAssertEqual(ShapeToken.CornerRadius.full, 9999)
    }

    func testCornerRadiusMonotonicallyIncreasing() {
        let values = [
            ShapeToken.CornerRadius.none,
            ShapeToken.CornerRadius.sm,
            ShapeToken.CornerRadius.md,
            ShapeToken.CornerRadius.lg,
            ShapeToken.CornerRadius.xl,
            ShapeToken.CornerRadius.xxl,
            ShapeToken.CornerRadius.xxxl,
            ShapeToken.CornerRadius.full
        ]
        for i in 0..<(values.count - 1) {
            XCTAssertLessThan(values[i], values[i + 1])
        }
    }

    // MARK: - Border Width

    func testBorderWidthValues() {
        XCTAssertEqual(ShapeToken.BorderWidth.thin, 1)
        XCTAssertEqual(ShapeToken.BorderWidth.regular, 2)
    }
}
