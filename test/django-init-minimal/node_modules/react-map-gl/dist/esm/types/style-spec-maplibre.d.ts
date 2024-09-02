import type { BackgroundLayerSpecification as BackgroundLayer, CircleLayerSpecification as CircleLayer, FillLayerSpecification as FillLayer, FillExtrusionLayerSpecification as FillExtrusionLayer, HeatmapLayerSpecification as HeatmapLayer, HillshadeLayerSpecification as HillshadeLayer, LineLayerSpecification as LineLayer, RasterLayerSpecification as RasterLayer, SymbolLayerSpecification as SymbolLayer, GeoJSONSourceSpecification as GeoJSONSourceRaw, VideoSourceSpecification as VideoSourceRaw, ImageSourceSpecification as ImageSourceRaw, VectorSourceSpecification as VectorSourceRaw, RasterSourceSpecification as RasterSource, RasterDEMSourceSpecification as RasterDemSource } from '@maplibre/maplibre-gl-style-spec';
import { CanvasSourceSpecification as CanvasSourceRaw } from 'maplibre-gl';
export type { BackgroundLayer, CircleLayer, FillLayer, FillExtrusionLayer, HeatmapLayer, HillshadeLayer, LineLayer, RasterLayer, SymbolLayer };
export declare type AnyLayer = BackgroundLayer | CircleLayer | FillLayer | FillExtrusionLayer | HeatmapLayer | HillshadeLayer | LineLayer | RasterLayer | SymbolLayer;
export { GeoJSONSourceRaw, VideoSourceRaw, ImageSourceRaw, CanvasSourceRaw, VectorSourceRaw, RasterSource, RasterDemSource };
export declare type AnySource = GeoJSONSourceRaw | VideoSourceRaw | ImageSourceRaw | CanvasSourceRaw | VectorSourceRaw | RasterSource | RasterDemSource;
export type { StyleSpecification as MapStyle, LightSpecification as Light, TerrainSpecification as Terrain } from '@maplibre/maplibre-gl-style-spec';
export declare type Fog = never;
export declare type Projection = never;
