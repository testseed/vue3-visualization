declare namespace T {
    // 坐标类型
    class LngLat {
        constructor(lng: number, lat: number);
    }

    // 地图实例
    class Map {
        constructor(container: string | HTMLElement, options?: any);
        centerAndZoom(center: LngLat, zoom: number): void;
        addOverlay(overlay: any): void;
        clearOverlays(): void;
        destroy(): void;
        // 其他需要用到的地图方法
    }

    // 图标类型
    class Icon {
        constructor(options: {
            iconUrl: string;
            iconSize: Size;
        });
    }

    // 尺寸类型
    class Size {
        constructor(width: number, height: number);
    }

    // 标记点类型
    class Marker {
        constructor(position: LngLat, options?: { icon: Icon });
        addTo(map: Map): void;
        on(event: string, callback: () => void): void;
        // 其他需要用到的 Marker 方法
    }

    // 弹窗类型（重点解决 InfoWindow 报错）
    class InfoWindow {
        constructor(content?: string, options?: any);
        setContent(content: string): void;
        open(map: Map, position: LngLat): void;
        close(): void;
        // 其他需要用到的 InfoWindow 方法
    }
}
// 声明全局变量 T，天地图 SDK 暴露的全局对象
declare const T: {
    // 坐标类
    LngLat: {
        new(lng: number, lat: number): {
            lng: number;
            lat: number;
        };
    };

    // 地图类
    Map: {
        new(container: string | HTMLElement, options?: any): {
            centerAndZoom: (center: T.LngLat, zoom: number) => void;
            addOverlay: (overlay: any) => void;
            clearOverlays: () => void;
            destroy: () => void;
            // 其他地图方法（根据实际使用补充）
        };
    };

    // 图标类
    Icon: {
        new(options: {
            iconUrl: string;
            iconSize: T.Size;
        }): any;
    };

    // 尺寸类
    Size: {
        new(width: number, height: number): {
            width: number;
            height: number;
        };
    };

    // 标记点类
    Marker: {
        new(position: T.LngLat, options?: { icon: T.Icon }): {
            addTo: (map: T.Map) => void;
            on: (event: string, callback: () => void) => void;
            // 其他Marker方法
        };
    };

    // 弹窗类
    InfoWindow: {
        new(content?: string, options?: any): {
            setContent: (content: string) => void;
            open: (map: T.Map, position: T.LngLat) => void;
            close: () => void;
            // 其他InfoWindow方法
        };
    };
};
