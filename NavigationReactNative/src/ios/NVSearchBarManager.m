#import "NVSearchBarManager.h"
#import "NVSearchBarView.h"

#import <UIKit/UIKit.h>
#import <React/RCTShadowView.h>

@interface NVSearchBarShadowView : RCTShadowView

@end

@implementation NVSearchBarShadowView

- (void)insertReactSubview:(id<RCTComponent>)subview atIndex:(NSInteger)atIndex
{
    [super insertReactSubview:subview atIndex:atIndex];
    if ([subview isKindOfClass:[RCTShadowView class]]) {
        ((RCTShadowView *)subview).size = RCTScreenSize();
    }
}

@end

@implementation NVSearchBarManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
    return [[NVSearchBarView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(hidesWhenScrolling, BOOL)
RCT_EXPORT_VIEW_PROPERTY(textAutocapitalizationType, UITextAutocapitalizationType)

- (RCTShadowView *)shadowView
{
    return [NVSearchBarShadowView new];
}

@end
